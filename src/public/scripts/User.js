class User {
    static API_URL = "http://localhost:3000/api/v1";
    constructor(email, password, username, date_of_birth, gender) {
        this.email = email;
        this.password = password;
        this.username = username;
        this.date_of_birth = date_of_birth;
        this.gender = gender;
    }

    async signUp(apiSignup) {
        return await fetch(apiSignup, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(this),
        });
    }

    async login(apiLogin) {
        return await fetch(apiLogin, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(this),
        });
    }

    static async logout(apiLogout) {
        return await fetch(apiLogout, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            },
        });
    }
}
