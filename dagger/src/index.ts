/**
 * A generated module for Commander functions
 *
 * This module has been generated via dagger init and serves as a reference to
 * basic module structure as you get started with Dagger.
 *
 * Two functions have been pre-created. You can modify, delete, or add to them,
 * as needed. They demonstrate usage of arguments and return types using simple
 * echo and grep commands. The functions can be called from the dagger CLI or
 * from one of the SDKs.
 *
 * The first line in this comment block is a short description line and the
 * rest is a long description with more detail on the module's purpose or usage,
 * if appropriate. All modules should have a short description.
 */
import {
  dag,
  Container,
  Directory,
  Secret,
  object,
  File,
  func,
  Service
} from "@dagger.io/dagger"

@object()
class Commander {  
  //dagger call buildbackend --source=. terminal --cmd=bash
  //dagger call buildbackend --source=. as-service up --ports=8080:80
  /*
    * Return container image with application source code and dependencies
    */
  @func()
  buildbackend(source: Directory): Container {

    const dockerpath = source.directory("/dockerfiles");
    const sourcepath = source.directory("/backend");

    return dag.container().build(dockerpath,{dockerfile:"backend-dockerfile"})
      .withDirectory("/var/www", sourcepath)
      .withMountedCache(
        "/root/.composer/cache",
        dag.cacheVolume("composer-cache"),
      )
      .withMountedCache(
        "/var/www/vendor",
        dag.cacheVolume("composer-vendor-cache"),
      )
      .withEnvVariable("CI_ENVIRONMENT", "development")
      .withEnvVariable("APACHE_DOCUMENT_ROOT","/var/www/public")
      .withExec(["composer", "install", "--no-interaction"])
      .withExec(["php", "spark", "serve"])
      // TODO: port is not availble but it is OK for docker compose
      .withExposedPort(80)

  }
  @func()
  backendService(source: Directory): Service {
    return this.buildbackend(source).asService()
  }
  // build a docker file
  @func()
  async buildDocker(dockerfile: File): Promise<Container> {
    const img = await dag
      .container()
      .withFile(`/src/dockerfile`,dockerfile)
      .withWorkdir("/src")
      .directory("/src")
      .dockerBuild() // build from Dockerfile

    return img
  }

  /*
    * Return result of unit tests
    */
  // @func()
  // async test(source: Directory): Promise<string> {
  //   return await this.build(source)
  //     .withEnvVariable("PATH", "./vendor/bin:$PATH", { expand: true })
  //     .withExec(["phpunit"])
  //     .stdout()
  // }

  /*
    * Return address of published container image
    */
//   @func()
//   async publish(
//     source: Directory,
//     version: string,
//     registryAddress: string,
//     registryUsername: string,
//     registryPassword: Secret,
//     imageName: string,
//   ): Promise<string> {
//     const image = this.build(source)
//       .withLabel("org.opencontainers.image.title", "Laravel with Dagger")
//       .withLabel("org.opencontainers.image.version", version)
//     // uncomment this to use a custom entrypoint file
//     // .withExec(["chmod", "+x", "/var/www/docker-entrypoint.sh"])
//     // .withEntrypoint(["/var/www/docker-entrypoint.sh"])

//     const address = await image
//       .withRegistryAuth(registryAddress, registryUsername, registryPassword)
//       .publish(`${registryAddress}/${registryUsername}/${imageName}`)

//     return address
//   }

}
