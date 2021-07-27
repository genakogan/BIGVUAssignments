const fs = require('fs');
const path = require('path');

let student = { 
    name: 'Mike',
    age: 23, 
    gender: 'Male',
    department: 'English',
    car: 'Honda' 
};
 
fs.writeFileSync(path.resolve(__dirname, 'student.json'), JSON.stringify(student));