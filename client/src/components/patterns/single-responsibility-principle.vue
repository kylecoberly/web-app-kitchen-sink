<template />
<script>
export default {
    mounted(){
/* waks:start-annotation=Problem
This is an example of a class that's ready to grow out of control. You make a new person with something like `new Person("Kyle Coberly", "kyle@kylecoberly.com")`, and if the email isn't valid, the constructor throws an error. That's all well-and-good, but the logic for validating an email doesn't have anything to do with being a person. You can imagine how this `Person` class can sprawl out of control as it grows to include name validation, details about behaviors that a person engages in, and so on. You also end up with repeated code for anything else that might need to do something like validate an email address.
waks:end-annotation */
!function(){
/* waks:start-example */
class Person {
    constructor(name, email){
        this.name = name;
        if (this.validateEmail(email)){
            this.email = email;
        } else {
            throw new Error("Invalid email");
        }
    }
    // This method is something a person does
    greet(){
        alert(`Aloha from ${this.name}!`);
    }
    // This method doesn't have anything to do with being a person
    validateEmail(email){
        // Test for valid email
        const regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return regex.test(email);
    }
}
/* waks:end-example */
}();
/* waks:start-annotation=Solution
By splitting Email into its own class, we can keep the validation logic out of the `Person` class while still being able to use all of its functionality. You can also reuse the email class anywhere you need an email! Most importantly, if anything having to do with email _or_ people changes in your app, you know exactly where to change the code.
waks:end-annotation */
!function(){
/* waks:start-example */
class Email {
    constructor(email){
        if (this.validate(email)){
            this.email = email;
        } else {
            throw new Error("Invalid email");
        }
    }
    // This is cohesive with the class
    validate(email){
        const regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return regex.test(email);
    }
}

class Person {
    constructor(name, email){
        this.name = name;
        this.email = new Email(email); // Use the new constructor
    }
    greet(){
        alert(`Aloha from ${this.name}!`);
    }
}
/* waks:end-example */
}();
    }
};

</script>
