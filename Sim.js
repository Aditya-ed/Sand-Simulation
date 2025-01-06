function make2Darray(cols,rows)
{
    let arr= new Array(cols);
    for(let i=0;i<cols;i++)
    {
        arr[i]=new Array(rows);
        for(let j=0;j<arr[i].length;j++)
        {
            arr[i][j]=0;
        }
    }
    return arr;
}
let grid;
let w=5;
let cols,rows;
let hueval=1;
let stage=0;
function setup()
{
    createCanvas(650, 600);
    colorMode(HSB,360,255,255);
    cols=width/w;
    rows=height/w;
    grid=make2Darray(cols,rows);    
    for(let i=0;i<cols;i++)
    {
        for(let j=0;j<rows;j++)
        {
            grid[i][j]=0;
        }
    }
}

function mouseDragged()
{
    let MouseC=floor(mouseX/w);
    let MouseR=floor(mouseY/w);
    let extent = floor(2);
    for(let i=-extent;i<=extent;i++)
    {
        for(let j=-extent;j<=extent;j++)
        {
            if(random(1)<=0.75)
            {let col=MouseC+i;
            let row=MouseR+j;
            if(col>=0 && col<=cols-1 && row>=0 && row<=rows-1 && grid[col][row]==0)
                {grid[col][row]= hueval + random(-13, 13);}}
        }
    }
    
}
function mousePressed()
{
    let MouseC=floor(mouseX/w);
    let MouseR=floor(mouseY/w);
    let extent = floor(3/2);
    for(let i=-extent;i<=extent;i++)
    {
        for(let j=-extent;j<=extent;j++)
        {
            if(random(1)<=0.75)
            {let col=MouseC+i;
            let row=MouseR+j;
            if(col>=0 && col<=cols-1 && row>=0 && row<=rows-1 && grid[col][row]==0)
                {grid[col][row]= hueval + random(-13, 13);}}
        }
    }
}
function game()
{
    background('black');
    for(let i=0;i<cols;i++)
    {
        for(let j=0;j<rows;j++)
        {
            noStroke();
            if(grid[i][j]>0)
            {fill(grid[i][j],255,255);
            let x=i*w;
            let y=j*w;
            square(x,y,w);}
        }
    } 
    let nextGrid=make2Darray(cols,rows);
    for(let i=0;i<cols;i++)
        {
            for(let j=0;j<rows;j++)
            {
                let state=grid[i][j];
                if(state>1){
                    let below=grid[i][j+1];
                    let dir=random([1,-1]);
                    let belowl,belowr;
                    if(i+dir >=0 && i+dir<=cols-1)
                    {belowl=grid[i+dir][j+1];}
                    if(i-dir >=0 && i-dir<=cols-1)
                    {belowr=grid[i-dir][j+1];}
                    if(below===0)
                    {
                        nextGrid[i][j+1]=grid[i][j];
                    }
                    else if(belowl===0)
                    {
                        nextGrid[i+dir][j]=grid[i][j];
                    }
                    else if(belowr===0)
                    {
                        nextGrid[i-dir][j]=grid[i][j];
                    }
                    else
                    {
                        nextGrid[i][j]=grid[i][j];
                    }
                }
            }
        } 
        grid=nextGrid;
        hueval+=1;
        if(hueval>360)
        {
            hueval=0;
        }
        textSize(13);
        // fill('black');
        // rect(10,10,75,30,10);
        fill('red');
        textAlign(LEFT);
        text("Reset",20,30);
        if(mouseX>=10 && mouseX<=75 && mouseY>=10 && mouseY<=30 && mouseIsPressed == true)
        {
            stage=0;
            setup();
            // draw();
        }
        
}
let fonts;
function preload()
{
    fonts=loadFont('04B_30__.TTF');
}
function titleScreen()
{
    textFont(fonts);
    background('black');
    textSize(30);
    textAlign(CENTER);
    fill('red');
    stroke(0,0,255);
    strokeWeight(6);
    text("Click and Drag",325,300);
    text("Your mouse to drop Sand!",325,340);
    if(mouseIsPressed==true)
        {
            stage=1;   
        }
    
}
function draw()
{
    if(stage==0)
    titleScreen();

    if(stage==1)
    {
        game();
    }
}
