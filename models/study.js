module.exports = function(sequelize, dataTypes){
    const study = sequelize.define("Study",{
        study_name : {
            type : dataTypes.STRING(50),
            allowNull : false,
        } ,study_inwon : {
            type : dataTypes.INTEGER(10),
            allowNull :false,

        },study_date : {
            type : dataTypes.STRING(20),
            allowNull : false,

        },study_time : {
            type : dataTypes.STRING(20),
            allowNull :false,
        },
        study_place:{
           type : dataTypes.STRING(20),
           allowNull : false, 
        },
        image_url : {
            type : dataTypes.STRING(300),
            allowNull :true,
        },

    });
    return study;
}