var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");

var user_schema = mongoose.Schema(
{
	local:
	{
		email: String,
		password: String
	},

	facebook:
	{
		id: String,
		token: String,
		email: String,
		name: String
	},

	twitter:
	{
		id: String,
		token: String,
		display_name: String,
		username: String
	},

	google:
	{
		id: String,
		token: String,
		email: String,
		name: String
	}
});

user_schema.methods.generate_hash = function(password)
{
	return (bcrypt.hashSync(password, bcrypt.genSaltSync(8), null));
};

user_schema.methods.valid_password = function(password)
{
	return (bcrypt.compareSync(password, this.local.password));
};

module.exports = mongoose.model("User", user_schema);
