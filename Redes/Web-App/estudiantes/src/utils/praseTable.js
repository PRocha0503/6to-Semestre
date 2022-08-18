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
	switch(grade)
	{
		case (grade >= 93):
			return "A";
			break;
		case (grade >= 90):
			return "A-";
			break;
		case (grade >= 87):
			return "B+";
			break;
		case (grade >= 83):
			return "B";
			break;
		case (grade >= 80):
			return "B-";
			break;
		case (grade >= 77):
			return "C+";
			break;
		case (grade >= 73):
			return "C";
			break;
		case (grade >= 70):
			return "C-";
			break;
		case (grade >= 67):
			return "D+";
			break;
		case (grade >= 64):
			return "D";
			break;
		case (grade < 34):
			return "E";
			break;
		default:
			return "ERR"

	}
};
export default praseTable;
