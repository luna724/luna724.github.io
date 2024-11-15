document.addEventListener("DOMContentLoaded", () => {
    // ヘッダーの読み込み
    fetch("/home/header.html")
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML("afterbegin", data);
            generateBreadcrumb();
        })
        .catch(error => console.error("ヘッダーの読み込みに失敗しました:", error));

    // パンくずリストの生成関数
    function generateBreadcrumb() {
        const breadcrumb = document.getElementById("breadcrumb");
        if (!breadcrumb) return;

        const pathArray = window.location.pathname
            .replace("/home", "")
            .split("/")
            .filter(part => part !== "");

        let breadcrumbHTML = '<a href="/home">Home</a>';
        let accumulatedPath = "/home";

        pathArray.forEach((part, index) => {
            accumulatedPath += `/${part}`;
            if (index === pathArray.length - 1) {
                breadcrumbHTML += ` &gt; <span>${part}</span>`;
            } else {
                breadcrumbHTML += ` &gt; <a href="${accumulatedPath}">${part}</a>`;
            }
        });

        breadcrumb.innerHTML = breadcrumbHTML;
    }
});
