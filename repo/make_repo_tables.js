// GitHub
async function fetchJsonData(repo) {
    const url = `https://raw.githubusercontent.com/${repo}/refs/heads/main/gh-pages/info.json`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('ファイルの取得に失敗しました');
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

// テーブルにデータを追加する関数
async function addVersionRow(repo) {
    const data = await fetchJsonData(repo);
    if (!data) return;

    const table = document.getElementById('version-table');
    const row = document.createElement('tr');
    row.innerHTML = `
            <td>${data.latest || 'N/A'}</td>
            <td>${data.release_data || 'N/A'}</td>
            <td>${data.author || 'N/A'}</td>
            <td>${data.features || 'N/A'}</td>
        `;
    table.appendChild(row);
}