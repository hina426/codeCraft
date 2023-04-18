
// get the draggable operation divs and the programmableArea div
const operations = document.getElementById("operations");
const programmableArea = document.getElementById("programmableArea");

// add a dragstart event listener to the operation divs
operations.addEventListener("dragstart", (event) => {
  // set the data for the drag operation
  event.dataTransfer.setData("text/plain", event.target.dataset.operation);
});

// add dragover and drop event listeners to the programmableArea div
programmableArea.addEventListener("dragover", (event) => {
  event.preventDefault();
});

programmableArea.addEventListener("drop", (event) => {
  event.preventDefault();
  // get the data for the drag operation
  const operationType = event.dataTransfer.getData("text/plain");
  // create a new div with the operation type as the class
//   const operationDiv = document.createElement("div");
//   operationDiv.classList.add(operationType);
//   operationDiv.innerHTML = operationType;
  // append the new div to the programmableArea div
//   programmableArea.appendChild(operationDiv);

    // programmableArea = document.getElementById("programmableArea");
    console.log(operationType)
    console.log(event.target)
    if(event.target.classList.contains("insideDiv")){
        dragAnddrophandler(operationType, event.target)
    }
    else dragAnddrophandler(operationType, programmableArea)
});


function genCode() {
    document.getElementById("code").innerHTML = "";
    _genCode(document.getElementById("programmableArea"), "");

}

function phpCodes(el) {
    if(el.classList.contains("blockvariable")) {
        let name = el.getElementsByClassName("Varname")[0].value;
        let val = el.getElementsByClassName("varVal")[0].value;
        return `$${name} = ${val} ; `;
    }
    else if(el.classList.contains("blockoutputStatement")){
        //do smth here for proper output
        let out = el.getElementsByClassName("outputecho")[0].value;
        return `echo " $${out} " ;`
    }

    else if(el.classList.contains("blockForLoop")) {
        let varName = el.getElementsByClassName("var")[0].value;
        let val = el.getElementsByClassName("initialValue")[0].value;
        let iter = el.getElementsByClassName("NoOfIterations")[0].value;
        let incDec = el.getElementsByClassName("incDec")[0].value;

        return `for ($${varName} = ${val} ; $${varName} < ${iter} ; $${incDec}) { `
    }
    else if(el.classList.contains("blockWhileLoop")){
        let op1 = el.getElementsByClassName("operand1")[0].value;
        let operator = el.getElementsByClassName("operations")[0].value;
        let op2 = el.getElementsByClassName("operand2")[0].value;

        return `while ( $${op1} ${operator} ${op2}) { `

    }
    else if(el.classList.contains("blockif")){
        let op1 = el.getElementsByClassName("opr1")[0].value;
        let operator = el.getElementsByClassName("opr")[0].value;
        let op2 = el.getElementsByClassName("opr2")[0].value;

        return `if ( $${op1} ${operator} $${op2}) { `

    }

    //

    else if(el.classList.contains("blockelse")){
        //do smth here for proper output
        return `else { `
    }

    else if(el.classList.contains("blockfunction")){
        let funName = el.getElementsByClassName("funcName")[0].value;
        //do smth here for parameters
        let returnValue = el.getElementsByClassName("ret")[0].value;
        let params = el.getElementsByClassName("params")[0].value.split(",");
        let paramsText = "";
        for (let  j=0; j<params.length; j++) {
            if (j  != params.length-1) {
                paramsText += "$"+params[j]+", ";
            } else {
                paramsText += "$"+params[j];
            }
        }

        return `function $${funName} (${paramsText}) {`

        //write return statement here
    }

    else if ((el.classList.contains("ret"))) {
        let returnValue = el.value;
        console.log("hogya")
        return `return $${returnValue};`
    }

    else if(el.classList.contains("blockReadFile")){
        let fileName = el.getElementsByClassName("fileName")[0].value;

        //do smth here file_get_contents
    
    }

    else if(el.classList.contains("blockWriteFile")){
        let writefileName = el.getElementsByClassName("writFileName")[0].value;

        //do smth here
    }

    else if (el.classList.contains("blockadd")) {
        let assignto = el.getElementsByClassName("assignto")[0].value;
        let var1 = el.getElementsByClassName("var1")[0].value;
        let var2 = el.getElementsByClassName("var2")[0].value;
        let op = el.getElementsByClassName("operationType")[0].innerHTML;
        return `$${assignto} = $${var1} ${op} $${var2};`

    }
    else if (el.classList.contains("blocksubtract")) {
        let assignto = el.getElementsByClassName("assignto")[0].value;
        let var1 = el.getElementsByClassName("var1")[0].value;
        let var2 = el.getElementsByClassName("var2")[0].value;
        let op = el.getElementsByClassName("operationType")[0].innerHTML;
        return `$${assignto} = $${var1} ${op} $${var2};`

    }
    else if (el.classList.contains("blockmultiply")) {
        let assignto = el.getElementsByClassName("assignto")[0].value;
        let var1 = el.getElementsByClassName("var1")[0].value;
        let var2 = el.getElementsByClassName("var2")[0].value;
        let op = el.getElementsByClassName("operationType")[0].innerHTML;
        return `$${assignto} = $${var1} ${op} $${var2};`

    }
    else if (el.classList.contains("blockdivide")) {
        let assignto = el.getElementsByClassName("assignto")[0].value;
        let var1 = el.getElementsByClassName("var1")[0].value;
        let var2 = el.getElementsByClassName("var2")[0].value;
        let op = el.getElementsByClassName("operationType")[0].innerHTML;
        return `$${assignto} = $${var1} ${op} $${var2};`

    }
    else if (el.classList.contains("blockmod")) {
        let assignto = el.getElementsByClassName("assignto")[0].value;
        let var1 = el.getElementsByClassName("var1")[0].value;
        let var2 = el.getElementsByClassName("var2")[0].value;
        let op = el.getElementsByClassName("operationType")[0].innerHTML;
        return `$${assignto} = $${var1} ${op} $${var2};`

    }
    else if (el.classList.contains("blockequal")) {
       
        let var1 = el.getElementsByClassName("var1")[0].value;
        let var2 = el.getElementsByClassName("var2")[0].value;
        let op = el.getElementsByClassName("operationType")[0].innerHTML;
        return `$${var1} ${op} $${var2};`

    }
    else if (el.classList.contains("blocknotequal")) {
       
        let var1 = el.getElementsByClassName("var1")[0].value;
        let var2 = el.getElementsByClassName("var2")[0].value;
        let op = el.getElementsByClassName("operationType")[0].innerHTML;
        return `$${var1} ${op} $${var2};`

    }

}

function _genCode(el, indent = "") {
    for(let i = 0; i < el.children.length; i++) {
        if (el.children[i].classList.contains("canDropInside")) {
            document.getElementById("code").innerHTML += "<br>" + indent + phpCodes(el.children[i]);
            let ell = el.children[i].getElementsByClassName("insideDiv")[0];
            _genCode(ell, indent + "   ");
            if (el.children[i].classList.contains("blockfunction")) {
                let retEl = el.children[i].getElementsByClassName("ret")[0];
                document.getElementById("code").innerHTML += "<br>" + indent + "    " + phpCodes(retEl);
            }
            document.getElementById("code").innerHTML += "<br>" + indent + "}";
        } else {
            document.getElementById("code").innerHTML += "<br>" + indent + phpCodes(el.children[i]);
        }
    }
}


function dragAnddrophandler(ev, parent){
    switch(ev){
        case('variable'):{
            parent.innerHTML += `
            <div class='newItem blockvariable'>Variable <br>
                <label for="Varname">Var name </label>
                <input size= '8' type="text" class="Varname" name="Varname">
                <label for="varVal">Value </label>
                <input size= '10' type="text" class="varVal" name="varVal">
            </div>
            `
        break;
        }
        case('outputStatement'):{
            parent.innerHTML += `
            <div class='newItem blockoutputStatement'>echo 
                <input size= '8' type="text" class="outputecho" name="outputecho" >
               
            </div>
            `
        break;
        }
        case('forloop'):{
            parent.innerHTML += `
            <div class='newItem canDropInside blockForLoop'>For Loop <br>
            <div>
                <label for="var">Var name </label>
                <input size= '5' type="text" class="var" name="var">
                <label for="initialValue">Initial Value </label>
                <input size= '5' type="text" class="initialValue" name="initialValue">
                <label for="NoOfIterations">No. of Iterations </label>
                <input size= '5' type="text" class="NoOfIterations" name="NoOfIterations">
                <label for="incDec">Inc/Dec </label>
                <input size= '5' type="text" class="incDec" name="incDec">
            </div>
            <div class="insideDiv">
            </div>
            </div>
            `
        break;
        }
        case('whileloop'):{
            parent.innerHTML += `
            <div class='newItem canDropInside blockWhileLoop'>While Loop <br>
            <label for="op1">Operand1 </label>
            <input size= '5' type="text" class="operand1" name="op1">
            <label for="operations">Operation </label>
            <input size= '5' type="text" class="operations" name="operations">
            <label for="op2">Operand2 </label>
            <input size= '5' type="text" class="operand2" name="op2">
            <div class="insideDiv">
            </div>
            </div>
            `
        break;
        }
        case('if'):{
            parent.innerHTML += `
            <div class='newItem canDropInside blockif'>If <br>
            <label for="opr1">Operand1 </label>
            <input size= '5' type="text" class="opr1" name="opr1">
            <label for="opr">Operation </label>
            <input size= '5' type="text" class="opr" name="opr">
            <label for="opr2">Operand2 </label>
            <input size= '5' type="text" class="opr2" name="opr2">
            
            
            <div class="insideDiv">
            </div>
            </div>
            `
        break;
        }
        case('else'):{
            parent.innerHTML += `
            <div class='newItem canDropInside blockelse'>Else <br>
            <div class="insideDiv">
            </div>
            </div>
            `
        break;
        }
        case('function'):{
            parent.innerHTML += `
            <div class='newItem canDropInside blockfunction'>Function <br>
            <label for="funcName">function </label>
            <input size= '5' type="text" class="funcName" name="funcName">
            <label for="params">Parameters</label>
            <input type="text" class="params" name= "params"></input>
            <label for="ret">Return </label>
            <input size= '5' type="text" class="ret" name="ret">
            
            <div class="insideDiv">
            </div>
            </div>
            `
        break;
        }
        case('readFile'):{
            parent.innerHTML += `
            <div class='newItem blockReadFile'>Function <br>
            <label for="fileName">Open </label>
            <input size= '5' type="text" class="fileName" name="fileName">

            //do smth for storing file in a variable

            </div>
            `
        break;
        }
        case('writeFile'):{
            parent.innerHTML += `
            <div class='newItem blockWriteFile'>Function <br>
            <label for="writefileName">Open </label>
            <input size= '5' type="text" class="writefileName" name="writefileName">

            //do smth here as well
            </div>
            `
        break;
        }
        case ('add'):  {
            parent.innerHTML += `
                <div class="newItem blockadd modifyblocks">
                <input size= '5' type="text" class="assignto"></input>
                <P>=</P>
                <input  size= '5' type="text" class="var1"></input>
                <p class="operationType">+</p>
                <input size= '5' type="text" class="var2"></input>
                </div>
            `
            break;
        }
        case ('subtract'):  {
            parent.innerHTML += `
                <div class="newItem blocksubtract modifyblocks">
                <input size= '5' type="text" class="assignto"></input>
                <P>=</P>
                <input size= '5' type="text" class="var1"></input>
                <p class="operationType">-</p>
                <input size= '5' type="text" class="var2"></input>
                </div>
            `
            break;
        }
        case ('multiply'):  {
            parent.innerHTML += `
                <div class="newItem blockmultiply modifyblocks">
                <input size= '5' type="text" class="assignto"></input>
                <P>=</P>
                <input size= '5' type="text" class="var1"></input>
                <p class="operationType">*</p>
                <input size= '5' type="text" class="var2"></input>
                </div>
            `
            break;
        }
        case ('divide'):  {
            parent.innerHTML += `
                <div class="newItem blockdivide modifyblocks">
                <input size= '5' type="text" class="assignto"></input>
                <P>=</P>
                <input size= '5' type="text" class="var1"></input>
                <p class="operationType">/</p>
                <input size= '5' type="text" class="var2"></input>
                </div>
            `
            break;
        }
        case ('mod'):  {
            parent.innerHTML += `
                <div class="newItem blockmod modifyblocks">
                <input size= '5' type="text" class="assignto"></input>
                <P>=</P>
                <input size= '5' type="text" class="var1"></input>
                <p class="operationType">%</p>
                <input size= '5' type="text" class="var2"></input>
                </div>
            `
            break;
        }
        case ('equal'):  {
            parent.innerHTML += `
                <div class="newItem blockequal modifyblocks">
                
                <input size= '5' type="text" class="var1"></input>
                <p class="operationType">=</p>
                <input size= '5' type="text" class="var2"></input>
                </div>
            `
            break;
        }
        case ('notequal'):  {
            parent.innerHTML += `
                <div class="newItem blocknotequal modifyblocks">
                
                <input size= '5' type="text" class="var1"></input>
                <p class="operationType">!=</p>
                <input size= '5' type="text" class="var2"></input>
                </div>
            `
            break;
        }

        default: 
            break;
    }
}


function execAndGetPHPOutput() {
    let code = document.getElementById("code").innerText;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "php.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("code=" + encodeURIComponent(code));
    xhr.onload = () => {
        document.getElementById("output").innerHTML = xhr.responseText;
    }
}