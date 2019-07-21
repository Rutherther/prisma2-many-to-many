import Photon from '@generated/photon'

const photon = new Photon()

// A `main` function so that we can use async/await
async function main() {
  const newEntity = await photon.entities.create({
    data: {
      name: 'Test entity',
      users: {
        connect: {
          email: 'alice@prisma.io'
        }
      }
    }
  });

  console.log(newEntity);

  await photon.entities.delete({
    where: {
      id: newEntity.id
    }
  }); // Fails
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await photon.disconnect()
  });
