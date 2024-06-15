function calculateAnnualFees() 
{
    let creditHours = parseFloat(document.getElementById('creditHours').value);
    let isSSE = document.getElementById('isSSE').checked;

    let perCreditHourFee = 37070;
    let registrationFeePerSemester = 48210;
    let sseFeePerSemester = isSSE ? 115620 : 0;

    let semesterFees = registrationFeePerSemester + sseFeePerSemester;
    let annualFees = Math.round((creditHours * perCreditHourFee) + semesterFees * 2);

    let formattedFees = annualFees.toLocaleString();

    document.getElementById('annualFees').textContent = formattedFees;
}

const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const footerHeight = 40;

window.addEventListener('resize', function() 
    {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initBoxes();
    }
);

let boxes = [];
const numBoxes = 20;

class Box 
{
    constructor(x, y, size, dx, dy, rotationSpeed, type) 
    {
        this.x = x;
        this.y = y;
        this.size = size;
        this.dx = dx;
        this.dy = dy;
        this.rotation = 0;
        this.rotationSpeed = rotationSpeed;
        this.type = type;
    }

    draw() 
    {
        ctx.save();
        ctx.translate(this.x + this.size / 2, this.y + this.size / 2);
        ctx.rotate(this.rotation);

        switch (this.type) 
        {
            case 'triangle':
                ctx.beginPath();
                ctx.moveTo(0, -this.size / 2);
                ctx.lineTo(this.size / 2, this.size / 2);
                ctx.lineTo(-this.size / 2, this.size / 2);
                ctx.closePath();
                ctx.fillStyle = '#FFD700';
                ctx.fill();
                break;
            case 'square':
                ctx.fillStyle = '#008000';
                ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
                break;
            case 'dinosaur':
                ctx.font = `${this.size}px Arial`;
                ctx.fillText('🦕', -this.size / 2, this.size / 2);
                break;
        }

        ctx.restore();
    }

    update() 
    {
        this.x += this.dx;
        this.y += this.dy;
        this.rotation += this.rotationSpeed;

        if (this.x + this.size > canvas.width || this.x < 0) 
        {
            this.dx = -this.dx;
        }
        if (this.y + this.size > canvas.height - footerHeight || this.y < 0) 
        {
            this.dy = -this.dy;
        }
    }
}

function initBoxes() 
{
    boxes = [];
    for (let i = 0; i < numBoxes; i++) 
    {
        let size = Math.random() * 20 + 30;
        let x = Math.random() * (canvas.width - size);
        let y = Math.random() * (canvas.height - size - footerHeight);
        let dx = (Math.random() - 0.5) * 4;
        let dy = (Math.random() - 0.5) * 4;
        let rotationSpeed = Math.random() * 0.04 - 0.02;
        let types = ['triangle', 'square', 'dinosaur'];
        let type = types[Math.floor(Math.random() * types.length)];
        boxes.push(new Box(x, y, size, dx, dy, rotationSpeed, type));
    }
}

function animate() 
{
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    boxes.forEach(box => box.update());
    boxes.forEach(box => box.draw());
}

initBoxes();
animate();

