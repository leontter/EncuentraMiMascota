Add-Type -AssemblyName System.IO.Compression.FileSystem
$zipPath = Resolve-Path "documentacion\bth perfil corregido.docx"
$zip = [System.IO.Compression.ZipFile]::OpenRead($zipPath)
$entry = $zip.GetEntry("word/document.xml")
$stream = $entry.Open()
$reader = New-Object System.IO.StreamReader($stream, [System.Text.Encoding]::UTF8)
$xmlText = $reader.ReadToEnd()
$reader.Close()
$stream.Close()
$zip.Dispose()

$xml = [xml]$xmlText
$ns = New-Object System.Xml.XmlNamespaceManager($xml.NameTable)
$ns.AddNamespace("w", "http://schemas.openxmlformats.org/wordprocessingml/2006/main")

$paragraphs = $xml.SelectNodes("//w:p", $ns)
$lines = @()
foreach ($p in $paragraphs) {
    $tNodes = $p.SelectNodes(".//w:t", $ns)
    $text = ""
    foreach ($t in $tNodes) {
        $text += $t.InnerText
    }
    if ($text.Trim().Length -gt 0) {
        $lines += $text
    }
}

$outText = $lines -join "`r`n"
Set-Content -Path "documentacion\extracted_perfil.txt" -Value $outText -Encoding UTF8
Write-Output "Successfully extracted $($lines.Count) lines to documentacion\extracted_perfil.txt"
