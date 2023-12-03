module.exports = function(sequelize, dataTypes){
    const food = sequelize.define("Food",{
        food_name : {
            type : dataTypes.STRING(50),
            allowNull : false,
        } ,kcal : {
            type : dataTypes.INTEGER(10),
            allowNull :false,

        },eat_date : {
            type : dataTypes.STRING(20),
            allowNull : false,

        },eat_time : {
            type : dataTypes.STRING(20),
            allowNull :false,
        },
        food_place:{
           type : dataTypes.STRING(20),
           allowNull : false, 
        },
        image_url : {
            type : dataTypes.STRING(300),
            allowNull :true,
        },
        
    });
    return food;
}