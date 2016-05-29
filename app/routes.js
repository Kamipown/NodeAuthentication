module.exports = function(app, passport)
{
	app.get("/", function(req, res)
	{
		res.render("index.ejs");
	});

	app.get("/login", function(req, res)
	{
		res.render("login.ejs", {message: req.flash("login_message")});
	});

	app.post('/login', passport.authenticate("local-login",
	{
		successRedirect: "/profile",
		failureRedirect: "/login",
		failureFlash: true
	}));

	app.get("/signup", function(req, res)
	{
		res.render("signup.ejs", {message: req.flash("signup_message")});
	});

	app.post('/signup', passport.authenticate("local-signup",
	{
		successRedirect: "/profile",
		failureRedirect: "/signup",
		failureFlash: true

	}));

	app.get("/profile", is_logged_in, function(req, res)
	{
		res.render("profile.ejs", {user: req.user});
	});

	app.get("/logout", function(req, res)
	{
		req.logout();
		res.redirect("/");
	});
}

function is_logged_in(req, res, next)
{
	if (req.isAuthenticated())
		return next();
	res.redirect("/");
}
