Add-Type -AssemblyName System.Drawing

$ErrorActionPreference = 'Stop'

$root = Resolve-Path (Join-Path $PSScriptRoot '..')
$assetDir = Join-Path $root 'reports\assets\eternal-return'
$outPath = Join-Path $assetDir 'summary-figures\character-terrain-matrix-centered.png'

$W = 1800
$H = 1160
$bg = [System.Drawing.Color]::FromArgb(255, 14, 21, 29)
$white = [System.Drawing.Color]::FromArgb(255, 245, 248, 252)
$sub = [System.Drawing.Color]::FromArgb(255, 190, 211, 226)
$muted = [System.Drawing.Color]::FromArgb(255, 120, 155, 168)
$cyan = [System.Drawing.Color]::FromArgb(255, 91, 196, 210)
$cyanWeak = [System.Drawing.Color]::FromArgb(255, 65, 131, 145)
$yellow = [System.Drawing.Color]::FromArgb(255, 251, 219, 84)
$grid = [System.Drawing.Color]::FromArgb(42, 255, 255, 255)

$bmp = New-Object System.Drawing.Bitmap($W, $H)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit
$g.Clear($bg)

function Font($size, $style = [System.Drawing.FontStyle]::Regular) {
  New-Object System.Drawing.Font('Microsoft YaHei UI', $size, $style, [System.Drawing.GraphicsUnit]::Pixel)
}

function Brush($color) {
  New-Object System.Drawing.SolidBrush($color)
}

function DrawText($text, $x, $y, $font, $brush, $format = $null) {
  if ($null -eq $format) {
    $g.DrawString($text, $font, $brush, [single]$x, [single]$y)
  } else {
    $g.DrawString($text, $font, $brush, [System.Drawing.RectangleF]::new($x, $y, 360, 80), $format)
  }
}

$titleFont = Font 42 ([System.Drawing.FontStyle]::Bold)
$noteFont = Font 22
$headFont = Font 24 ([System.Drawing.FontStyle]::Bold)
$nameFont = Font 23 ([System.Drawing.FontStyle]::Bold)
$roleFont = Font 18

$bWhite = Brush $white
$bSub = Brush $sub
$bYellow = Brush $yellow
$bCyan = Brush $cyan
$bWeak = Brush $cyanWeak
$bGrid = Brush $grid

DrawText '角色与地形适配矩阵图' 60 42 $titleFont $bWhite
DrawText '圆点越亮代表越依赖该空间。依据：本地路线样例 + 角色职责分析 + 官方地图路网，不等于强度排行。' 60 92 $noteFont $bSub

$characters = @(
  @{key='jackie'; cn='洁琪'; en='Jackie'; role='近战收割'; vals=@(3,1,2,2,2)},
  @{key='aya'; cn='阿雅'; en='Aya'; role='中远程输出'; vals=@(1,3,2,1,2)},
  @{key='fiora'; cn='菲欧娜'; en='Fiora'; role='近战决斗'; vals=@(2,1,2,1,1)},
  @{key='rio'; cn='莉央'; en='Rio'; role='远程架线'; vals=@(1,3,2,1,2)},
  @{key='haze'; cn='海兹'; en='Haze'; role='火力压制'; vals=@(1,3,2,1,2)},
  @{key='hyejin'; cn='慧珍'; en='Hyejin'; role='控制封路'; vals=@(2,1,2,1,3)},
  @{key='nadine'; cn='娜汀'; en='Nadine'; role='成长远程'; vals=@(1,3,3,1,1)},
  @{key='eleven'; cn='十一'; en='Eleven'; role='入口承压'; vals=@(3,1,2,2,3)},
  @{key='estelle'; cn='埃丝特尔'; en='Estelle'; role='保护救援'; vals=@(2,1,2,3,3)},
  @{key='luke'; cn='卢克'; en='Luke'; role='短窗刺杀'; vals=@(3,1,2,3,2)},
  @{key='xiukai'; cn='修凯'; en='Xiukai'; role='补给运营'; vals=@(1,1,3,2,1)},
  @{key='magnus'; cn='马格努斯'; en='Magnus'; role='前排冲撞'; vals=@(3,1,2,1,3)}
)

$headers = @('窄路/短窗', '开阔/长线', '外圈运营', 'Kiosk 兑现', '研究中心外环')
$leftX = 60
$avatarX = 58
$textX = 126
$headerY = 168
$rowStartY = 242
$rowStep = 66
$avatarSize = 52
$rowCenterOffset = 26
$gridX = 360
$colW = 252
$gridW = $colW * 5
$gridTop = $rowStartY - 36
$gridBottom = $rowStartY + ($characters.Count - 1) * $rowStep + 60
$cols = @()
for ($i = 0; $i -lt 5; $i++) { $cols += ($gridX + $colW * $i + $colW / 2) }

$centerFormat = New-Object System.Drawing.StringFormat
$centerFormat.Alignment = [System.Drawing.StringAlignment]::Center
$centerFormat.LineAlignment = [System.Drawing.StringAlignment]::Center

$gridPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(32,255,255,255), 1)
$bandBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(13,255,255,255))
for ($i = 0; $i -lt $headers.Count; $i++) {
  if ($i % 2 -eq 0) {
    $g.FillRectangle($bandBrush, [single]($gridX + $i * $colW), [single]$gridTop, [single]$colW, [single]($gridBottom - $gridTop))
  }
  $rect = [System.Drawing.RectangleF]::new($gridX + $i * $colW, $headerY - 22, $colW, 48)
  $g.DrawString($headers[$i], $headFont, $bYellow, $rect, $centerFormat)
  $g.DrawLine($gridPen, [single]($gridX + $i * $colW), [single]$gridTop, [single]($gridX + $i * $colW), [single]$gridBottom)
}
$g.DrawLine($gridPen, [single]($gridX + $gridW), [single]$gridTop, [single]($gridX + $gridW), [single]$gridBottom)

for ($r = 0; $r -lt $characters.Count; $r++) {
  $cy = $rowStartY + $r * $rowStep
  $g.DrawLine($gridPen, 54, [single]($cy + $rowCenterOffset + 34), [single]($gridX + $gridW), [single]($cy + $rowCenterOffset + 34))
}
$gridPen.Dispose()
$bandBrush.Dispose()

foreach ($idx in 0..($characters.Count - 1)) {
  $c = $characters[$idx]
  $y = $rowStartY + $idx * $rowStep
  $cy = $y + $rowCenterOffset
  $avatarPath = Join-Path $assetDir ("character-{0}.png" -f $c.key)
  $img = [System.Drawing.Image]::FromFile($avatarPath)
  $g.DrawImage($img, $avatarX, $cy - $avatarSize / 2, $avatarSize, $avatarSize)
  $img.Dispose()

  DrawText ("{0} {1}" -f $c.cn, $c.en) $textX ($cy - 25) $nameFont $bWhite
  DrawText $c.role $textX ($cy + 3) $roleFont $bSub

  for ($i = 0; $i -lt $cols.Count; $i++) {
    $v = $c.vals[$i]
    $radius = if ($v -eq 3) { 24 } elseif ($v -eq 2) { 20 } else { 15 }
    $brush = if ($v -eq 3) { $bYellow } elseif ($v -eq 2) { $bCyan } else { $bWeak }
    $x = $cols[$i]
    $g.FillEllipse($brush, $x - $radius, $cy - $radius, $radius * 2, $radius * 2)
  }
}

$legendY = 1094
$legendFont = Font 18
$legendItems = @(
  @{label='强依赖'; color=$yellow; r=14},
  @{label='中依赖'; color=$cyan; r=12},
  @{label='弱依赖'; color=$cyanWeak; r=10}
)
$legendX = 60
foreach ($item in $legendItems) {
  $brush = Brush $item.color
  $g.FillEllipse($brush, $legendX, $legendY, $item.r * 2, $item.r * 2)
  DrawText $item.label ($legendX + 34) ($legendY - 2) $legendFont $bSub
  $brush.Dispose()
  $legendX += 130
}
DrawText '注：圆点位置按每个矩阵单元格的中心绘制；颜色与大小只表达地形依赖，不表达角色强度。' 470 ($legendY - 2) $legendFont $bSub

$bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)

$g.Dispose()
$bmp.Dispose()
$bWhite.Dispose()
$bSub.Dispose()
$bYellow.Dispose()
$bCyan.Dispose()
$bWeak.Dispose()
$bGrid.Dispose()

