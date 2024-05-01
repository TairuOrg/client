export default function Header({title}:Readonly<{title: string}>) {
    return (
        <h1>{title}</h1>
    );
}