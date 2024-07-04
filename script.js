document.getElementById('downloadForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const videoUrl = document.getElementById('videoUrl').value;
    try {
        const response = await fetch('/download-instagram', {  // Ganti endpoint '/download' dengan '/download-instagram'
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: videoUrl }),
        });
        const data = await response.json();
        console.log(data);  // Log data yang diterima dari server
        if (data.videoUrl && data.thumbnailUrl && data.title) {
            const fileName = `Instagram_Video_${Date.now()}.mp4`;  // Ubah nama file sesuai dengan platform
            const isDarkTheme = document.body.classList.contains('dark-theme');
            const cardClass = isDarkTheme ? 'bg-dark text-white' : '';
            document.getElementById('result').innerHTML = `
                <div class="card mx-auto ${cardClass}" style="width: 18rem;">
                    <img src="${data.thumbnailUrl}" class="card-img-top" alt="Video Thumbnail">
                    <div class="card-body">
                        <h5 class="card-title">${data.title}</h5>
                        <a href="${data.videoUrl}" class="btn btn-primary" download="${fileName}">Download Video</a>
                    </div>
                </div>
            `;
        } else {
            document.getElementById('result').textContent = 'Error: Missing video information';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('result').textContent = 'Error downloading video';
    }
});

document.getElementById('pasteButton').addEventListener('click', function() {
    navigator.clipboard.readText()
        .then(text => document.getElementById('videoUrl').value = text)
        .catch(err => console.error('Failed to read clipboard contents: ', err));
});

document.getElementById('siteName').addEventListener('click', function() {
    location.reload();
});

document.getElementById('themeToggle').addEventListener('click', function() {
    const body = document.body;
    const navbar = document.querySelector('.navbar');
    const formControl = document.querySelectorAll('.form-control');
    const themeIcon = document.getElementById('themeToggle').querySelector('i'); // Tambahkan ini untuk mengambil ikon tema

    body.classList.toggle('dark-theme');
    body.classList.toggle('light-theme');
    
    navbar.classList.toggle('dark-theme');
    navbar.classList.toggle('light-theme');

    formControl.forEach(control => {
        control.classList.toggle('dark-theme');
        control.classList.toggle('light-theme');
    });

    // Ubah ikon berdasarkan tema yang aktif
    if (body.classList.contains('dark-theme')) {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon'); // Ganti dengan ikon "moon" untuk tema gelap
    } else {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun'); // Ganti dengan ikon "sun" untuk tema terang
    }

    this.textContent = body.classList.contains('dark-theme') ? 'Light Theme' : 'Dark Theme';
});
