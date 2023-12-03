module.exports = function(sequelize, dataTypes){
    const todo = sequelize.define("Todo",{
        todo_contents : {
            type :dataTypes.STRING(500),
            allowNull : false,
        }, 
        todo_date : {
            type :dataTypes.STRING(20),
            allowNull : false,
        },
        end_yn :{
            type : dataTypes.STRING(1),
            allowNull : false,
        },
    });
    return todo;
}
