const express = require("express");
const cors = require("cors");
const app = express();
const models = require("./models");
const multer = require("multer");

const upload = multer({

  storage : multer.diskStorage({
    destination : function(req, file, cb){
      cb(null, 'uploads/')
    },
    filename:function(req,file,cb){
      cb(null, file.originalname);
    }
  })
});

const port = 8080;

app.use(express.json());
app.use(cors());
app.use('/uploads',express.static('uploads'));


app.get("/todos",(req,res)=>{
  models.Todo.findAll({
    order :[["createdAt","ASC"]],
    attributes:[
      'id',
      'todo_contents',
      'end_yn',
      'createdAt',

    ]
  }).then((result)=>{
    console.log("TODO::",result);
    res.send({
      todos: result
    });
  }).catch((error)=>{
    console.log(error);
    res.status(400).send("에러 발생");
  });
});

app.get("/todos/:date",(req,res)=>{
  const params = req.params;
  const {date}  = params;
  models.Todo.findAll({
      where:{
          todo_date:date,
      },
      order :[["createdAt", "DESC"]],
      attributes :[
        'id',
        'todo_contents',
        'todo_date',
        'end_yn',
        'createdAt',
      ]
  
})
.then((result)=>{
  console.log("TODOS:::",result);
  res.send({
      todos:result,
  })
})
.catch((error)=>{
  console.error(error);
  res.status(400).send("todo 조회 에러");
});

});

app.post('/image',upload.single('image'),(req,res) => {
    const file = req.file;
    res.send({
        imageUrl : file.path,
    });
});
app.post("/todos",(req,res) => {
  const body = req.body;
  const {todo_contents,todo_date,end_yn} = body;
  if(!todo_contents ||!todo_date ||!end_yn){
    res.status(400).send("할일을 입력해주세요");
  }

  models.Todo.create({
    todo_contents,
    todo_date,
    end_yn,
  }).then((result)=>{
    console.log("할일 등록:",result);
    res.send({
      result,
    });
  }).catch((error)=>{
  console.error(error);
  res.status(400).send("등록에 문제가 발생");
  });
});
/* study 불러오기 ,등록 */

app.get("/studies",(req,res)=>{
    models.Study.findAll({
      order :[["createdAt","ASC"]],
      attributes:[
        'id',
        'study_name',
        'study_inwon',
        'study_date',
        'study_time',
        'study_place',
        'image_url',
        'createdAt',
  
      ]
    }).then((result)=>{
      console.log("STUDY::",result);
      res.send({
        studies: result
      });
    }).catch((error)=>{
      console.log(error);
      res.status(400).send("에러 발생");
    });
  });




  app.post("/studies",(req,res) => {
    const body = req.body;
    const {study_name,study_inwon,study_date
,study_time,study_place,image_url} = body;
    if(!study_name ||!study_inwon ||!study_date ||!study_time
        ||!study_place ){
      res.status(400).send("스터디를 입력해주세요");
    }
  
    models.Study.create({
        study_name,
        study_inwon,
        study_date,
        study_time,
        study_place,
        image_url,
    }).then((result)=>{
      console.log("스터디 등록:",result);
      res.send({
        result,
      });
    }).catch((error)=>{
    console.error(error);
    res.status(400).send("등록에 문제가 발생");
    });
  });


  app.get("/studies/:date",(req,res)=>{
    const params = req.params;
    const {date}  = params;
    models.Study.findAll({
        where:{
            study_date:date,
        },
        order :[["createdAt", "DESC"]],
        attributes :[
            'id',
            'study_name',
            'study_inwon',
            'study_date',
            'study_time',
            'study_place',
            'image_url',
            'createdAt',
        ]
    
  })
  .then((result)=>{
    console.log("STUDIES:::",result);
    res.send({
        studies:result,
    })
  })
  .catch((error)=>{
    console.error(error);
    res.status(400).send("스터디 조회 에러");
  });

  });

/*food 등록 */
app.post("/foods",(req,res) => {
  const body = req.body;
  const {food_name,kcal,eat_date
,eat_time,food_place,image_url} = body;
  if(!food_name ||!kcal ||!eat_date ||!eat_time
      ||!food_place ){
    res.status(400).send("음식을 입력해주세요");
  }

  models.Food.create({
      food_name,
      kcal,
      eat_date,
      eat_time,
      food_place,
      image_url,
  }).then((result)=>{
    console.log("푸드 등록:",result);
    res.send({
      result,
    });
  }).catch((error)=>{
  console.error(error);
  console.log("에러발생:",error);
  res.status(400).send("등록에 문제가 발생");
  });
});

/*food 조회 */
app.get("/foods/:date",(req,res)=>{
  const params = req.params;
  const {date}  = params;
  models.Food.findAll({
      where:{
          eat_date:date,
      },
      order :[["createdAt", "DESC"]],
      attributes :[
          'id',
          'food_name',
          'kcal',
          'eat_date',
          'eat_time',
          'food_place',
          'image_url',
          'createdAt',
      ]
  
})
.then((result)=>{
  console.log("FOODS:::",result);
  res.send({
      foods:result,
  })
})
.catch((error)=>{
  console.error(error);
  res.status(400).send("푸드 조회 에러");
});

});
/*--------------------------- */
app.listen(port,"0.0.0.0", () => {
    models.sequelize.sync().then(()=>{
     console.log('DB 연결 성공!');
    }).catch((err) =>{
     console.error(err);
     console.log('DB 연결 에러');
     process.exit();
    });
 })


