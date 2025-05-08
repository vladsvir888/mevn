export default (link: string) => {
  return `
        <div>
            <h1>Для восстановления перейдите по ссылке</h1>
            <a href="${link}">${link}</a>
        </div>
    `;
};
