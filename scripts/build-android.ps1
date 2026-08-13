$ErrorActionPreference = "Stop"

$gradleHome = "C:\gradle"
New-Item -ItemType Directory -Force -Path $gradleHome | Out-Null

$env:GRADLE_USER_HOME = $gradleHome
$env:ANDROID_HOME = "$env:LOCALAPPDATA\Android\Sdk"

if (-not $env:JAVA_HOME) {
  $javaCandidates = @(
    "C:\Program Files\Microsoft\jdk-17.0.16.8-hotspot",
    "C:\Program Files\Microsoft\jdk-17*",
    "C:\Program Files\Eclipse Adoptium\jdk-17*",
    "C:\Program Files\Java\jdk-17*"
  )
  foreach ($candidate in $javaCandidates) {
    $resolved = Get-Item $candidate -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($resolved) {
      $env:JAVA_HOME = $resolved.FullName
      break
    }
  }
}

if (-not $env:JAVA_HOME) {
  throw "JAVA_HOME is not set. Install JDK 17 and retry."
}

Push-Location "$PSScriptRoot\..\android"
try {
  .\gradlew bundleRelease --no-daemon
  $aab = Get-ChildItem -Recurse -Filter "app-release.aab" "app\build\outputs\bundle\release" |
    Select-Object -First 1
  if ($aab) {
    Write-Host "`nAAB built successfully:`n$($aab.FullName)"
  }
} finally {
  Pop-Location
}
