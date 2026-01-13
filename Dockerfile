FROM debian:trixie AS base
RUN apt update && apt upgrade -y
RUN apt install unzip git curl -y
RUN curl -fsSL https://go.dev/dl/go1.25.5.linux-$(dpkg --print-architecture).tar.gz \
    | tar -C /usr/local -xz
ENV PATH="/usr/local/go/bin:/root/go/bin:${PATH}"
RUN go install github.com/wailsapp/wails/v2/cmd/wails@latest
RUN curl -fsSL https://bun.com/install | bash -s "bun-v1.3.5"
ENV PATH="/root/.bun/bin:$PATH"
RUN curl -o- https://fnm.vercel.app/install | bash
RUN curl -fsSL https://deb.nodesource.com/setup_24.x | bash -  \
    && apt install -y nodejs \
    && corepack enable pnpm \
    && corepack prepare pnpm@latest --activate

FROM base AS devcontainer