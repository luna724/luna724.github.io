document.addEventListener("DOMContentLoaded", () => {
    // ヘッダーの読み込み
    fetch("/header.html")
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

        // 最初の2つ（"luna724.github.io" 部分）を無視
        const relevantPaths = pathArray.slice(2);


        let breadcrumbHTML = '';
        let accumulatedPath = "/home";

        relevantPaths.forEach((part, index) => {
            accumulatedPath += `/${part}`;
            if (index === pathArray.length - 1) {
                breadcrumbHTML += ` <a class="tonext">&raquo;</a> <span>${part}</span>`;
            } else {
                breadcrumbHTML += ` <a class="tonext">&raquo;</a> <a href="${accumulatedPath}">${part}</a>`;
            }
        });

        breadcrumb.innerHTML = breadcrumbHTML;
    }
});
