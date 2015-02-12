name := "mameclub"

version := "1.0"

scalaVersion := "2.11.5"

resolvers ++= Seq("snapshots"     at "https://oss.sonatype.org/content/repositories/snapshots",
  "staging"       at "https://oss.sonatype.org/content/repositories/staging",
  "releases"      at "https://oss.sonatype.org/content/repositories/releases"
)

jetty()

unmanagedResourceDirectories in Test <+= (baseDirectory) { _ / "src/main/webapp" }

scalacOptions ++= Seq("-deprecation", "-unchecked", "-feature")

libraryDependencies ++= {
  val liftVersion = "2.6"
  Seq(
    "net.liftweb"       %% "lift-webkit"        % liftVersion        % "compile",
    "net.liftweb"       %% "lift-mapper"        % liftVersion        % "compile",
    "net.liftmodules"   %% "fobo_2.6"           % "1.3"     % "compile",
    "org.eclipse.jetty" % "jetty-webapp"        % "9.3.0.M1"  % "container,test",
    "org.eclipse.jetty" % "jetty-plus"          % "9.3.0.M1"  % "container,test", // For Jetty Config
    "javax.servlet" % "javax.servlet-api" % "3.1.0" % "container,test",
    "ch.qos.logback"    % "logback-classic"     % "1.1.2",
    "org.specs2"        %% "specs2"             % "2.3.12"           % "test",
    "com.h2database"    % "h2"                  % "1.4.185"
  )
}