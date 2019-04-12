export default class RestService {
    _apiBase = 'http://greensecurity.ru:42422';
    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` +
                `, received ${res.status}`)
        }
        return await res.json();
    }

    async deleteItem(id) {
        let res = await fetch(`${this._apiBase}/items/${id}/`, { method: 'delete' });
        return res;
    }

    async getAllCategories() {
        let res = await fetch(`${this._apiBase}/items/`, { method: 'options' })
        res = await res.json();
        return res.actions.POST.category.choices;
    }

    async getAllItemsOfCategory(category) {
        const res = await fetch(`${this._apiBase}/items/filter/?category=${category}`);
        return await res.json();
    }

    async getAllItems() {
        const res = await this.getResource("/items");
        return res;
    }

    async getCategory(name) {
        const res = await this.getResource(`/category/${name}`);
        return res.results;
    }
    async getItem(id) {
        const item = await this.getResource(`/items/${id}`);
        return item;
    }
    async logIn(user, password) {
        let res = fetch(`${this._apiBase}/api-token-auth/`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({ username: `${user}`, password: `${password}` })
            });
        return await res;
    }

    async postForm(place, dataToSubmit) {
        let res = fetch(`${this._apiBase}${place}`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(dataToSubmit)
            });
        return await res;
    }

    async register(dataToSubmit) {
        return this.postForm("/users/", dataToSubmit);
    }

    async createItem(dataToSubmit) {
        return this.postForm("/items/", dataToSubmit);
    }

    async updateItem(dataToSubmit, id) {
        let res = fetch(`${this._apiBase}/items/${id}/`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'PATCH',
                body: JSON.stringify(dataToSubmit)
            });
        return await res;
    }

    async getCurrentUser(token) {
        console.log(token);
        let res = await fetch(`${this._apiBase}/users/current/`, {
            headers: {
                'Authorization': `JWT ${token}`
            }
        })
        return res;
    }
}