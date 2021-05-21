//Tree
function tree_node(key,children){
    this.key = key;
    this.children = children;
}

/*
Conventions :
0 : O, minimizes
1 : X, maximizes
*/

/*

`root` of the minimax (sub)tree
*/
function mini(root) {
	if (root.children.length > 0) {
		var minkey = root.children[0].key;
		var minim = root.children[0].obj[0];
		for (var child in root.children) {
			if (minim > root.children[child].obj[0]) {
				minim = root.children[child].obj[0];
				minkey = root.children[child].key;
			}else if (minim == root.children[child].obj[0]) {
				if(Math.random() > 0.5){
					minkey = root.children[child].key;
				}
			}
		}
		return [minim, minkey];
	}
	return [];
}
function maxi(root) {
	if (root.children.length > 0) {
		var maxkey = root.children[0].key;
		var maxim = root.children[0].obj[0];
		for (var child in root.children) {
			if (maxim < root.children[child].obj[0]) {
				maxim = root.children[child].obj[0];
				maxkey = root.children[child].key;
			}
		}
		return [maxim, maxkey];
	}
	return []
}
/*
returns -1 if O wins
		0  if draw
		1  if x wins
		NaN otherwise i.e state is not interior node
	state of board
	count of number of steps

	//assumptions
	state[.][.] is  0 if O is there
					1 if x is there
*/
function evalu(state, count) {
	for (var i = 0; i < state.length; i++) {
		if (state[i][0] == state[i][1] && state[i][1] == state[i][2]) {
			if (state[i][0] == 0) {// O won
				return -1;
			} else if (state[i][0] == 1) { // X won
				return 1;
			}
		}
	}
	for (var j = 0; j < 3; j++) {
		if (state[0][j] == state[1][j] && state[1][j] == state[2][j]) {
			if (state[0][j] == 0) { // O won
				return -1;
			} else if (state[0][j] == 1) { // X won
				return 1;
			}
		}
	}
	if (state[0][0] == state[1][1] && state[0][0] == state[2][2]) {
		if (state[0][0] == 0) { // O won
			return -1;
		} else if (state[0][0] == 1) { // X won
			return 1;
		}
	}
	if (state[0][2] == state[1][1] && state[1][1] == state[2][0]) {
		if (state[0][2] == 0) { // O won
			return -1;
		} else if (state[0][2] == 1) { // X won
			return 1;
		}
	}
	if (count == 9)
		return 0;
	return NaN;
}
function mini_build(root,state,count){
	var ev = evalu(state,count);
	//console.log('mini');
	//console.log(root);
	if( isNaN(ev) ){
		for(var i=0; i<9; i++){
			var s = state[parseInt(i/3)][i%3];
			if(s != 0 && s != 1){
				state[parseInt(i/3)][i%3] = 0;
				count++;
				var t = new tree_node(i,[]);
				maxi_build(t,state,count);
				root.children.push(t);
				count--;
				state[parseInt(i/3)][i%3] = NaN;
			}
		}
		root.obj = mini(root);
		//console.log(root.obj);
	}else{
		root.obj = [ev,NaN];
	}
}
function maxi_build(root,state,count){
	var ev = evalu(state,count);
	//console.log('maxi'+ev);
	//console.log(root);
	if( isNaN(ev) ){ //interiror node
		for(var i=0; i<9; i++){
			var s = state[parseInt(i/3)][i%3];
			if(s != 0 && s != 1){
				state[parseInt(i/3)][i%3] = 1;
				count++;
				var t = new tree_node(i,[]);
				mini_build(t,state,count);
				root.children.push(t);
				count--;
				state[parseInt(i/3)][i%3] = NaN;
			}
		}
		root.obj = maxi(root);
		//console.log(count, root.obj);
	}else{
		root.obj = [ev,NaN];
	}
}
/*

*/
// function minimax(root, state, count) {
// 	root = 
// 	console.log('minimax');
// 	maxi_build(root,state,count);
// 	//root.obj = [evl, NaN];
// }
function minimax() {
	var tree_board = [[9, 8, 7], [6, 5, 4], [3, 2, 10]];
	var count = 0;
	var minimaxtree = new tree_node(NaN, []);
	//console.log(minimaxtree);
	maxi_build(minimaxtree, tree_board, count);
	return minimaxtree;
}
/*
partially complete
*/
function next_optimal_choice(state,root){
	var ptr = root;
	for(var i=0; i<3; i++){
		for(var j=0; j<3; j++){
			if(state[i][j] != 0 && state[i][j] != 1){
				if(ptr.children.length > 0){
					for(var c in ptr.children){
						if(ptr.children[c].key == i*3 + j){
							//ptr = 
							return ptr.children[c];
							
							//break;
						}else{console.log(ptr.children[c].key,i*3+j);}
					} 
				}else{
					console.log('Error');
				}
			}else{	console.log(state[i][j]); }
		}
	}
	return NaN;
}
function node_on_path(root,path){
	var ptr = root;
	for(var nd in path){
//		console.log('nd',nd);
		for(var c in ptr.children){
//			console.log('children',c);
			if(ptr.children[c].key == path[nd]){
//				console.log('match',c);
				ptr = ptr.children[c];
				break;
			}
		}
	}
	return ptr;
}