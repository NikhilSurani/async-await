const users = [
    {
        id: 1,
        name: "Nikhil",
        schoolId: 101,
    },
    {
        id: 2,
        name: "Jill",
        schoolId: 999
    },
    {
        id: 3,
        name: "Hitesh",
        schoolId: 898
    }

];

const grades = [{
    id: 1,
    schoolId: 101,
    grade: 86

}, {
    id: 2,
    schoolId: 999,
    grade: 86
}, {
    id: 3,
    schoolId: 898,
    grade: 96
}
];


const getUser = (id) => {
    return new Promise((resolve, reject) => {
        const user = users.find((user) => {
            return user.id === id;
        });
        if (user) {
            resolve(user);

        } else {
            reject(`unable to find user id ${id}.`);
        }
    });

}
const getGrade = (schoolId) => {
    return new Promise((resolve, reject) => {

        resolve(grades.filter((grade) => {
            return grade.schoolId === schoolId;
        }));

    });

}

const getStatus = (userId) => {
    let user;
    return getUser(userId).then((tempUser) => {
        user = tempUser;
        return getGrade(user.schoolId);
    }).then((grades) => {
        let average = 0;
        if (grades.length > 0) {
            average = grades.map((grade) => grade.grade).reduce((a, b) => a + b) / grades.length;
        }
        return `${user.name} has a ${average} % in the class.`;
        // console.log(average);

    })

}

// async await 

const getStatusalt = async (userId) => {    
    let user = await getUser(userId);
    let grades = await getGrade(user.schoolId);

    let average = 0;
    if (grades.length > 0) {
        average = grades.map((grade) => grade.grade).reduce((a, b) => a + b) / grades.length;
    }
    return `${user.name} has a ${average} % in the class.`;
}

getStatusalt(1).then((result) => {
    console.log(result);
}).catch((e) => {
    console.log(e);
});

// console.log(getStatusalt());

// getStatus(2).then((getGrade) => {
//     console.log(getGrade);

// }).catch((e) => {
//     console.log(e);

// });