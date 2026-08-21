Add-Type -AssemblyName System.Drawing

$assetRoot = Join-Path $PSScriptRoot '..\public\assets'

function New-Canvas([int]$width, [int]$height) {
  $bitmap = [System.Drawing.Bitmap]::new($width, $height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
  return @($bitmap, $graphics)
}

function Add-Badge([System.Drawing.Graphics]$g, [float]$x, [float]$y, [float]$size) {
  $outer = [System.Drawing.RectangleF]::new($x, $y, $size, $size)
  $radius = $size * .22
  $path = [System.Drawing.Drawing2D.GraphicsPath]::new()
  $path.AddArc($outer.X, $outer.Y, $radius, $radius, 180, 90)
  $path.AddArc($outer.Right - $radius, $outer.Y, $radius, $radius, 270, 90)
  $path.AddArc($outer.Right - $radius, $outer.Bottom - $radius, $radius, $radius, 0, 90)
  $path.AddArc($outer.X, $outer.Bottom - $radius, $radius, $radius, 90, 90)
  $path.CloseFigure()
  $brush = [System.Drawing.Drawing2D.LinearGradientBrush]::new($outer, [System.Drawing.Color]::FromArgb(255, 172, 115, 255), [System.Drawing.Color]::FromArgb(255, 95, 34, 217), 45)
  $g.FillPath($brush, $path)
  $brush.Dispose()

  $inset = $size * .075
  $screen = [System.Drawing.RectangleF]::new($x + $inset, $y + $inset, $size - 2*$inset, $size - 2*$inset)
  $screenPath = [System.Drawing.Drawing2D.GraphicsPath]::new()
  $screenPath.AddArc($screen.X, $screen.Y, $radius * .68, $radius * .68, 180, 90)
  $screenPath.AddArc($screen.Right - $radius * .68, $screen.Y, $radius * .68, $radius * .68, 270, 90)
  $screenPath.AddArc($screen.Right - $radius * .68, $screen.Bottom - $radius * .68, $radius * .68, $radius * .68, 0, 90)
  $screenPath.AddArc($screen.X, $screen.Bottom - $radius * .68, $radius * .68, $radius * .68, 90, 90)
  $screenPath.CloseFigure()
  $g.FillPath([System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(255, 14, 10, 24)), $screenPath)

  $barHeight = $size * .18
  $g.FillRectangle([System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(220, 255, 255, 255)), $x + $size*.14, $y + $size*.17, $size*.72, $barHeight*.22)
  for ($i = 0; $i -lt 4; $i++) {
    $stripeX = $x + $size * (.17 + .18*$i)
    $g.FillPolygon([System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(255, 95, 34, 217)), [System.Drawing.PointF[]]@([System.Drawing.PointF]::new($stripeX,$y+$size*.15),[System.Drawing.PointF]::new($stripeX+$size*.075,$y+$size*.15),[System.Drawing.PointF]::new($stripeX+$size*.015,$y+$size*.32),[System.Drawing.PointF]::new($stripeX-$size*.06,$y+$size*.32)))
  }
  $g.DrawLine([System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(110, 172, 115, 255), $size*.017), $x+$size*.14, $y+$size*.38, $x+$size*.86, $y+$size*.38)
  $play = [System.Drawing.PointF[]]@([System.Drawing.PointF]::new($x+$size*.42,$y+$size*.49),[System.Drawing.PointF]::new($x+$size*.42,$y+$size*.77),[System.Drawing.PointF]::new($x+$size*.69,$y+$size*.63))
  $g.FillPolygon([System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(255, 245, 241, 255)), $play)
  $path.Dispose(); $screenPath.Dispose()
}

$icon, $iconGraphics = New-Canvas 1024 1024
Add-Badge $iconGraphics 62 62 900
$icon.Save((Join-Path $assetRoot 'logo2.png'), [System.Drawing.Imaging.ImageFormat]::Png)
$iconGraphics.Dispose(); $icon.Dispose()

$wordmark, $wordmarkGraphics = New-Canvas 1800 480
Add-Badge $wordmarkGraphics 56 66 348
$font = [System.Drawing.Font]::new('Arial', 164, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$format = [System.Drawing.StringFormat]::new()
$format.Alignment = [System.Drawing.StringAlignment]::Near
$format.LineAlignment = [System.Drawing.StringAlignment]::Center
$wordmarkGraphics.DrawString('MOVIE', $font, [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(255, 247, 243, 255)), [System.Drawing.RectangleF]::new(456, 76, 680, 318), $format)
$wordmarkGraphics.DrawString('DON', $font, [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(255, 172, 115, 255)), [System.Drawing.RectangleF]::new(1030, 76, 520, 318), $format)
$tagFont = [System.Drawing.Font]::new('Arial', 28, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$tagBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(210, 213, 196, 255))
$tagFormat = [System.Drawing.StringFormat]::new(); $tagFormat.Alignment = [System.Drawing.StringAlignment]::Near
$wordmarkGraphics.DrawString('WATCH   |   DISCOVER   |   REMEMBER', $tagFont, $tagBrush, [System.Drawing.RectangleF]::new(466, 302, 850, 60), $tagFormat)
$wordmark.Save((Join-Path $assetRoot 'logo.png'), [System.Drawing.Imaging.ImageFormat]::Png)
$tagFont.Dispose(); $font.Dispose(); $wordmarkGraphics.Dispose(); $wordmark.Dispose()
