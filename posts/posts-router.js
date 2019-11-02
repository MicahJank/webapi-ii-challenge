const express = require('express');

const data = require('../data/db.js');

const router = express.Router();


router.post('/', (req, res) => {
    const { title, contents } = req.body;

    if(!title || !contents) {
        res.status(400).json({
            errorMessage: "Please provide title and contents for the post."
        });
    } else {
        data.insert(req.body)
            .then(postID => {
               return postID.id;
            }).then(id => {
                data.findById(id)
                .then(post => {
                    res.status(201).json(post);
                })
                .catch(err => {
                    res.status(500).json({ error: "The post information could not be retrieved." });
                });
            })
            .catch(err => {
                res.status(500).json({ error: "There was an error while saving the post to the database" });
            });
    };
});

router.post('/:id/comments', (req, res) => {
    const { text } = req.body;
    const { id } = req.params;
        
    if(!text) {
        res.status(400).json({ errorMessage: "Please provide text for the comment." });
    } else {
        data.insertComment({ text, post_id: id })
        .then(idObject => {
            return idObject.id;          
        }).then(id => {
            data.findCommentById(id)
                .then(comment => {
                    res.status(201).json(comment);
                })
                .catch(err => {
                    res.status(404).json({ message: "The comment with the specified ID does not exist." });
                })
        })
        .catch(err => { // after it errors, we need to know WHY it errored. the findById method below will let us know if it errored because it couldnt find the posts id
            data.findById(id)
                .then(post => {
                    if(!post.length) {
                        res.status(404).json({ message: "The post with the specified ID does not exist." });
                    } else {
                        res.status(500).json({ error: "There was an error while saving the comment to the database" });
                    };
                });
        });
    };
});

router.get('/', (req, res) => {
    data.find()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            res.status(500).json({ error: "The posts information could not be retrieved." });
        });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    data.findById(id)
        .then(post => {
            // findById returns an empty array if it cannot find the post. Therefore to return a status error 404 when the post cannot be found we
            // need to check the post.length
            if(!post.length) {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            } else {
                res.status(200).json(post);
            };
        })
        .catch(err => {
            res.status(500).json({ error: "The post information could not be retrieved." });
        });
});

router.get('/:id/comments', (req, res) => {
    const { id } = req.params;

    data.findPostComments(id)
        .then(comments => {
            if(!comments.length) {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            } else {
                res.status(200).json(comments);
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The comments information could not be retrieved." });
        });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    data.findById(id)
        .then(post => {
            if(!post.length) {
                res.status(404).json({ message: "The post with the specified ID does not exist" });
            } else {
                data.remove(id)
                    .then(nums => {
                        res.status(200).json(post);
                    })
                    .catch(err => {
                        res.status(500).json({ error: "The post could not be removed." });
                    });
                };
        })
        .catch(err => {
            res.status(500).json({ error: "The post information could not be retrieved." });
        });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, contents } = req.body;

    if(!title || !contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    } else {
        data.update(id, req.body)
            .then(itemsRemoved => {
                if(itemsRemoved > 0) {
                    data.findById(id)
                        .then(post => {
                            res.status(200).json(post);
                        })
                        .catch(err => {
                            res.status(500).json({ error: "The post information could not be retrieved." });
                        });
                } else {
                    res.status(404).json({ message: "The post with the specified ID does not exist" });
                };
            })
            .catch(err => {
                res.status(500).json({ error: "The post information could not be modified." });
            });
    };
});



module.exports = router;