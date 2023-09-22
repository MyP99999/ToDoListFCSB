export function html({ url, text }) {
    return `
    <div style="max-width: 700px; margin: auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
        <h2 style="text-align: center; text-transform: capitalize; color: teal;">Welcome to the L'David Site</h2>
        <p>
        Congratulations!
        </p>
        <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${text}</a>
        <p>If the button doesn't work for any reason, you can also click on the link below:</p>
        <div>${url}</div>
    </div>
    `
}