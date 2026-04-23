# Build stage
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app
COPY . .
RUN dotnet publish -c Release -o out

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:9.0
ENV ASPNETCORE_URLS=http://+:80
WORKDIR /app
COPY --from=build /app/out .
ENTRYPOINT ["dotnet", "UrlShortener.Api.dll"]