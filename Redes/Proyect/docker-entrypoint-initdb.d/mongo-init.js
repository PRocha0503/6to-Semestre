console.log(
	"______________________________________________________________ADDING ADMIN_____________________________________"
);

db = db.getSiblingDB("alvaroobregon");

db.createCollection("users");
db.users.insertMany([
	{
		username: "admin",
		password: "$2a$10$hiP6swPZvVhBuy6jSDQSA.osmkekZ13uzn1K6s0Cq4ng1VgSuGP62",
		isAdmin: true,
	},
]);
