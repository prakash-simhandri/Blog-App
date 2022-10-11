module.exports = (Blog, DB_model) => {
    var datetime = require('node-datetime');
    var dt = datetime.create();
    Blog.post('/post', (req, res) => {
        var formatted = dt.format('d/m/Y');
        const { username, tittle, description, content, unique_id } = req.body;
        var user_Blog_Info = new DB_model({ username: username, tittle: tittle, description: description, content: content, date: formatted, unique_id: unique_id })
        user_Blog_Info.save(function (err) {
            if (!err) {
                res.send('Done..')
            } else {
                var info = err.message;

                res.send(info);
            }
        })
    })

    // All blogs code...

    Blog.get('/all/section', (req, res) => {
        DB_model.find({}).select(['-createdAt', '-updatedAt', '-__v'])
            .then((response) => [
                res.send(response.reverse())
            ])
            .catch((reject) => {
                res.send(reject.message)
            })
    })

    // user blogs code...

    Blog.get('/mydata/:unique_id', (req, res) => {
        const user_id_key = req.params.unique_id;
        DB_model.find({ 'unique_id': user_id_key }).select(['username', 'tittle', 'description', 'date'])
            .then(Response => {
                res.send(Response)
            }).catch(Reject => {
                res.send(Reject)
            })
    })

    // only one blog ...

    Blog.get('/one/:unique_id', (req, res) => {
        DB_model.findById(req.params.unique_id).select(['content', 'tittle', 'description'])
            .then((result) => {
                res.send(result)
            }).catch(error => console.log(error))
    })



    // Delelt blog code...

    Blog.delete('/delete/:unique_id', (req, res) => {
        const user_id = req.params.unique_id;
        DB_model.findByIdAndDelete(user_id)
            .then(() => res.send('blog deleted.'))
            .catch(err => res.status(400).send('Error:' + err))
    })

    // Update blogo code...

    Blog.post('/update/:unique_id', (req, res) => {
        var formatted = dt.format('d/m/Y');
        DB_model.findById(req.params.unique_id)
            .then(blog => {
                blog.tittle = req.body.tittle;
                blog.description = req.body.description;
                blog.content = req.body.content;
                blog.date = formatted;
                blog.save()
                    .then(() => res.send('Blog updated..!'))
                    .catch(err => res.status(400).send('Error:' + err))
            }).catch(error => res.status(400).send('Error:' + error));
    })

}