<div class = "footer">
    <img src = "" alt = "Theme" id = "theme" class = "theme">
    <script>
        var isDarkTheme = localStorage.getItem('isDarkTheme');
        if (isDarkTheme === 'true')
        {
            setDarkTheme();
        } 
        else 
        {
            setLightTheme();
        }
        document.getElementById('theme').addEventListener('click', function () 
        {
            if (isDarkTheme === 'true') 
            {
                setLightTheme();
                isDarkTheme = 'false';
                localStorage.setItem('isDarkTheme', isDarkTheme);
            } 
            else 
            {
                setDarkTheme();
                isDarkTheme = 'true';
                localStorage.setItem('isDarkTheme', isDarkTheme);
            }
        });

        function setLightTheme() 
        {
            document.documentElement.style.setProperty('--themeColor', 'black');
            document.documentElement.style.setProperty('--loadingColor', 'white');
            document.documentElement.style.setProperty('--background', 'var(--backgroundLight)');
            document.documentElement.style.setProperty('--contentBackground', 'var(--contentBackgroundLight)');
            document.getElementById('theme').src = 'img/Dark_Theme.png';
            document.getElementById('logo').src = 'img/LogoDark.png';
        }

        function setDarkTheme() 
        {
            document.documentElement.style.setProperty('--themeColor', 'white');
            document.documentElement.style.setProperty('--loadingColor', 'black');
            document.documentElement.style.setProperty('--background', 'var(--backgroundDark)');
            document.documentElement.style.setProperty('--contentBackground', 'var(--contentBackgroundDark)');
            document.getElementById('theme').src = 'img/Light_Theme.png';
            document.getElementById('logo').src = 'img/logo.png';
        }
    </script>
</div>