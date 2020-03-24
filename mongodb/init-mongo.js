db.createUser(
    {
        user: "bidside",
        pwd: "bidside",
        roles: [
            {
                role: "readWrite",
                db: "bidside"
            }
        ]
    }
)
