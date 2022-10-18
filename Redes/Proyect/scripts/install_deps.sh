distr='unknown'

installUbuntuDeps() {
    sudo apt-get update

    # Install dependencies
    sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

    # Add Docker’s official GPG key ( To verify the authenticity of the packages )
    sudo mkdir -p /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    
    echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
    $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

    # Add the current user to the docker group
    sudo usermod -aG docker $USER

    # Install git
    sudo apt-get install git

    source ~/.bashrc
}

setOS() {
    distr=$(cat /etc/os-release | grep ^ID | tr "=" "\n" | tail -n 1)
}

install() {
    setOS
    echo "Installing dependencies..."

    if [ "$distr" = "ubuntu" ]; then
        installUbuntuDeps
    else
        echo "Unsupported OS: $distr"
        exit 1
    fi

    echo "Dependencies installed successfully!"
}