const praseTable = ([idx, name, id, grad, grade]) => {
	return [
		idx,
		praseName(name),
		praseID(id),
		praseDate(grad),
		praseGrade(grade),
	];
};

const praseName = (name) => {
	const ar = name.split(" ");
	ar.pop();
	return ar.join(" ");
};

const praseID = (id) => {
	return id + "@tec.mx";
};

const praseDate = (date) => {
	const ar = date.split("/");
	var inter = ar[0];
	ar[0] = ar[1];
	ar[1] = inter;
	return ar.join("/");
};

const praseGrade = (grade) => {
	let grade_us = ""
	if (grade < 64){
		grade_us= "E";
		return grade_us;
	}
	else if (grade<67){
		grade_us="D";
		return grade_us;
	}
	else if (grade<70){
		grade_us="D+";
		return grade_us;
	}
	else if (grade<73){
		grade_us="C-";
		return grade_us;
	}
	else if (grade<77){
		grade_us="C";
		return grade_us;
	}
	else if (grade<80){
		grade_us="C+";
		return grade_us;
	}
	else if (grade<83){
		grade_us="B-";
		return grade_us;
	}
	else if (grade<87){
		grade_us="B";
		return grade_us;
	}
	else if (grade<90){
		grade_us="B+";
		return grade_us;
	}
	else if (grade<93){
		grade_us="A-";
		return grade_us;
	}
	else{
		grade_us="A"
		return grade_us;
	}
};
export default praseTable;
