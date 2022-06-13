@file:Suppress("unused", "RedundantVisibilityModifier", "MemberVisibilityCanBePrivate")

package blue.starry.gradle

import org.gradle.api.Project
import kotlin.properties.ReadOnlyProperty

public fun Project.env(name: String): EnvReference {
    return EnvReference(name)
}

public val Project.env: ReadOnlyProperty<Any?, EnvReference>
    get() = ReadOnlyProperty { _, property -> env(property.name) }

public data class EnvReference(private val name: String) {
    public val value: String
        get() = System.getenv(name) ?: error("Env: $name is not present.")

    public val valueOrNull: String?
        get() = System.getenv(name)

    public fun valueOrElse(default: () -> String): String {
        return valueOrNull ?: default()
    }

    public val isPresent: Boolean
        get() = name in System.getenv()
}
