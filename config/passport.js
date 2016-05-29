var local_strategy = require("passport-local").Strategy;

var User = require("../app/models/user");

module.exports = function(passport)
{
	passport.serializeUser(function(user, done)
	{
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done)
	{
		User.findById(id, function(err, user)
		{
			done(err, user);
		});
	});

	// signup
	passport.use("local-signup", new local_strategy(
	{
		usernameField: "email",
		passwordField: "password",
		passReqToCallback: true
	},
	function(req, email, password, done)
	{
		process.nextTick(function()
		{
			User.findOne({"local.email": email}, function(err, user)
			{
				if (err)
					return done(err);

				if (user)
				{
					return done(null, false, req.flash("signup_message", "That email is already taken."));
				}
				else
				{
					var new_user = new User();

					new_user.local.email = email;
					new_user.local.password = new_user.generate_hash(password);

					new_user.save(function(err)
					{
						if (err) throw err;
						return done(null, new_user);
					});
				}
			});
		});
	}));

	// login
	passport.use("local-login", new local_strategy(
	{
		usernameField: "email",
		passwordField: "password",
		passReqToCallback: true
	},
	function(req, email, password, done)
	{
		User.findOne({"local.email": email}, function(err, user)
		{
			if (err)
				return done(err);
			if (!user)
				return done(null, false, req.flash("login_message", "No user found."));

			if (!user.valid_password(password))
				return done(null, false, req.flash("login_message", "Wrong password."));

			return done(null, user);
		});
	}));
}
