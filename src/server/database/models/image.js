const image = (sequelize, Sequelize = require('sequelize')) => {
  const Image = sequelize.define('image', {
    location: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    width: {
      type: Sequelize.INTEGER
    },
    height: {
      type: Sequelize.INTEGER
    },
    alt: {
      type: Sequelize.STRING
    }
  });
  Image.createImage = async function(userId, location, opts) {
    const img = await Image.create({
      location,
      userId,
      main: true,
      ...opts
    });
    return img;
  };
  Image.associations = {};
  Image.associate = models => {
    Image.associations.User = Image.hasOne(models.user);
  };

  return Image;
};

export default image;
