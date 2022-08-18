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
	return "A";
};
export default praseTable;
