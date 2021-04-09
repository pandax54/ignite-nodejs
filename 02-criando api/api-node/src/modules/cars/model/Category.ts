import { v4 as uuid }  from 'uuid'

class Category {
    
    id?: string;
    name: string;
    description: string;
    created_at: Date;

    constructor() {
        // if it's a new object, create a new id
        if(!this.id) {
            this.id = uuid()
        }
    }
}

export { Category }