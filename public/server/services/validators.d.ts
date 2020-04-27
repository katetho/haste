declare const validate: {
    name: (name: string) => boolean;
    password: (pass: string) => boolean;
    email: (email: string) => boolean;
    department: (department: string) => boolean;
};
export { validate };
