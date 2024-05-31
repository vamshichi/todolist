const express = require ('express');
const { createTodo, updateTodo, deleteTodo } = require('./types');
const { todo } = require('./db');
const cors = require('cors');
const app = express();
const port = 5000;


app.use(express.json())
app.use(cors())

app.post('/todo', async (req, res) => {
    const jsonData = req.body;
    const postPayload = createTodo.safeParse(jsonData);
    if (!postPayload.success) {
        res.status(411).json({
            message: 'Enter valid input',
        });
        return;
    }

    await todo.create({
        title: postPayload.data.title,
        description: postPayload.data.description,
        completed: false,
    });
    res.json({
        message: 'Created successfully',
    });
});


app.get('/todo',async(req,res)=>{
const todos =await todo.find({});
res.json({todos});
})

app.put('/completed',async(req,res)=>{
    const jsonData = req.body;
    const updatePayload = updateTodo.safeParse(jsonData);
    if(!updatePayload.success){
        res.status(411).json({
            message : 'enter the valid input'
        })
        return ;
    }

    await todo.updateOne({
        _id : req.body.id 
    },
    {
        completed : true
    })
    res.json({
        msg : 'marked as completed'
    })

})

app.delete('/delete',async(req,res)=>{
    const jsonData = req.body;
    const deletePaylode = deleteTodo.safeParse(jsonData);
    if(!deletePaylode.success){
        res.status(411).json({
            message : 'enter the valid input'
        })
        return;
    }
    await todo.deleteOne({ _id: req.body.id });
    res.json({
        msg : 'deleted sucessfully'
    })

})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });