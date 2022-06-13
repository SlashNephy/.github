@file:Suppress("unused", "RedundantVisibilityModifier", "MemberVisibilityCanBePrivate")

package blue.starry.gradle

import org.gradle.api.Project
import java.net.URI

private const val MavenCentralStagingRepositoryUrl = "https://oss.sonatype.org/service/local/staging/deploy/maven2"
public val Project.MavenCentralStagingRepositoryUri: URI
    get() = uri(MavenCentralStagingRepositoryUrl)

private const val MavenCentralSnapshotRepositoryUrl = "https://oss.sonatype.org/content/repositories/snapshots"
public val Project.MavenCentralSnapshotRepositoryUri: URI
    get() = uri(MavenCentralSnapshotRepositoryUrl)
