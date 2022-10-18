# First Download the installer (wget is slow...)
# wget https://download.docker.com/win/stable/Docker%20for%20Windows%20Installer.exe -OutFile docker-installer.exe

(New-Object System.Net.WebClient).DownloadFile('https://download.docker.com/win/stable/Docker%20for%20Windows%20Installer.exe', 'docker-installer.exe')

# Install
start-process -wait docker-installer.exe " install --quiet"

# Clean-up
rm docker-installer.exe

# Run
start-process "$env:ProgramFiles\docker\Docker\Docker for Windows.exe"

write-host "Done."