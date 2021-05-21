//alpha-beta
//requires evalu function to be defined available at minimax.js
/*
Assumptions:
#1.
// assuming time is a constraint and space is not.
// also, opponent may not play optimally then, we need to re-compute
// But if space is constraint, remove the mensioned line
*/
function mini_build_ab(root,state,count){
	var ev = evalu(state,count);
	//console.log('mini');
	//console.log(root);
	if( isNaN(ev) ){//interior node
		for(var i=0; i<9; i++){
			var s = state[parseInt(i/3)][i%3];
			if(s != 0 && s != 1){
				state[parseInt(i/3)][i%3] = 0;
				count++;
				var t = new tree_node(i,[]);
                t.a = root.a;
                t.b = root.b;
                maxi_build_ab(t,state,count);
                // this min_node-root wants child max_node-t to return (t.a) from [root.a,root.b]
                if(t.a < root.a){
                    root.children.push(t);//Assumption#1 applicable this needs an update or confirmation. since not proven
                    root.obj = [NaN,NaN];// didn't calculate min yet.
                    return;
                }else if(t.a < root.b){
                    root.b = t.a;
                    root.obj = [t.a,i];
                }
                root.children.push(t);//Assumption#1 applicable. If you remove this line don't forget to add it in above else if
				count--;
				state[parseInt(i/3)][i%3] = NaN;
			}
		}
		//root.obj = mini(root);
		//console.log(root.obj);
	}else{
        root.a = ev;
		root.obj = [ev,NaN];
	}
}

function maxi_build_ab(root,state,count){
	var ev = evalu(state,count);
	//console.log('mini');
	//console.log(root);
	if( isNaN(ev) ){//interior node
		for(var i=0; i<9; i++){
			var s = state[parseInt(i/3)][i%3];
			if(s != 0 && s != 1){
				state[parseInt(i/3)][i%3] = 0;
				count++;
				var t = new tree_node(i,[]);
                t.a = root.a;
                t.b = root.b;
                mini_build_ab(t,state,count);
                // this max_node(i.e root) wants child max_node(i.e t) to return (t.b) from [root.a,root.b]
                if(t.b > root.b){
                    root.children.push(t);//Assumption#1 applicable this needs an update or confirmation. since not proven
                    root.obj = [NaN,NaN];// didn't calculate max yet.
                    return;
                }else if(t.b > root.a){
                    root.a = t.b;
                    root.obj = [t.b,i];
                }
                root.children.push(t);//Assumption#1 applicable. If you remove this line don't forget to add it in above else if
				count--;
				state[parseInt(i/3)][i%3] = NaN;
			}
		}
		//root.obj = mini(root);
		//console.log(root.obj);
	}else{
        root.b = ev;
		root.obj = [ev,NaN];
	}
}
function minimax_ab(){
	var tree_board = [[9, 8, 7], [6, 5, 4], [3, 2, 10]];
	var count = 0;
	var minimaxtree = new tree_node(NaN, []);
	maxi_build(minimaxtree, tree_board, count);
	return minimaxtree;
}