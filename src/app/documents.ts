export interface Documents {
    gender: string;
    name: {
        title: string,
        first: string,
        last: string
    };
    location: {
        city: string,
        state: string,
        postcode: number
    };
    email: string;
    dob: {
        age: number
    };
    registered: {
        date: string,
        age: number
    };
    phone: string;
    cell: string;
    picture: {
        large: string,
        medium: string,
        thumbnail: string
    };
}
