plugins {
    kotlin("jvm") version "1.8.0"

    `java-gradle-plugin`
    `maven-publish`
    id("com.gradle.plugin-publish") version "1.2.1"
}

group = "blue.starry"
version = "0.0.1"

pluginBundle {
    website = "https://github.com/SlashNephy/.github/tree/master/env/gradle"
    vcsUrl = "https://github.com/SlashNephy/.github"
    tags = listOf("kotlin", "extension")
}

gradlePlugin {
    plugins {
        create("gradle-extension") {
            id = "blue.starry.gradle"
            displayName = "gradle-extension"
            description = "A Gradle plugin which extends the existing Gradle Kotlin DSL."
            implementationClass = "blue.starry.gradle.GradleExtensionPlugin"
        }
    }
}

publishing {
    repositories {
        mavenLocal()
    }
}

repositories {
    mavenCentral()
}

dependencies {
    compileOnly(gradleApi())
    implementation(kotlin("stdlib"))
}

tasks {
    compileKotlin {
        kotlinOptions {
            jvmTarget = JavaVersion.VERSION_17.toString()
        }
    }
}
