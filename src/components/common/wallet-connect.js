"use client";

import {
  Button,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
  Image,
  Checkbox,
  Menu,
  MenuButton,
  MenuList,
  GridItem,
  MenuItem,
  Flex,
  Text,
  Grid,
} from "@chakra-ui/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getWallets } from "@talismn/connect-wallets";
import { IoChevronDownOutline } from "react-icons/io5";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

const getSignature = async (account, callbackUrl) => {
  try {
    // NOTE: If `account` object is not handy, then use `getWalletBySource` to get the wallet then the signer.
    console.log(account);
    const signer = account.wallet.signer;
    console.log(signer);
    // NOTE: This line will trigger the extension popup
    const { signature } = await signer.signRaw({
      type: "payload",
      data: `Login to dotappstore using ${account.address}`,
      address: account.address,
    });
    console.log(signature);
    await signIn("credentials", {
      address: account.address.toString(),
      message: `Login to dotappstore using ${account.address}`,
      signature: signature.toString(),
      callbackUrl: callbackUrl,
    });
  } catch (err) {
    console.log(err);
    console.log("Error while signing");
  }
};

export default function WalletConnect() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [checked, setChecked] = useState(false);
  const [supportedWallets, setSupportedWallets] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [enabledAccounts, setEnabledAccounts] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  useEffect(() => {
    setEnabledAccounts(null);
  }, [isOpen]);

  useEffect(() => {
    console.log(enabledAccounts);
  }, [enabledAccounts]);

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  useEffect(() => {
    setSupportedWallets(getWallets());
  }, []);
  console.log(supportedWallets);

  return (
    <>
      <Button
        colorScheme="green"
        marginTop={"10px"}
        width={"full"}
        onClick={onOpen}
      >
        Sign in with Web3 wallet
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          {selected && enabledAccounts != null ? (
            <>
              <ModalHeader textAlign={"center"}>
                <Flex flexDir={"column"}>
                  <Text fontSize={"2xl"} as={"b"}>
                    Login to dotappstore
                  </Text>
                  <Text fontSize={"md"}>
                    Please select an account with a
                    <Link
                      href="https://wiki.polkadot.network/docs/learn-identity"
                      style={{ color: "#d0307a" }}
                    >
                      <b> verified identity </b>
                    </Link>
                  </Text>
                </Flex>
              </ModalHeader>
              <ModalBody>
                <Flex flexDir={"column"} gap={"30px"} paddingBottom={"20px"}>
                  <Flex flexDir={"column"} gap={"10px"}>
                    <Menu matchWidth>
                      <MenuButton
                        as={Button}
                        rightIcon={<IoChevronDownOutline />}
                        variant={"outline"}
                        h={"60px"}
                      >
                        <Flex
                          justifyContent={"space-between"}
                          alignItems={"center"}
                          gap={"10px"}
                          w={"100%"}
                        >
                          {selectedAccount ? (
                            <Grid
                              templateColumns="auto 1fr"
                              columnGap={4}
                              rowGap={1}
                            >
                              <GridItem colSpan={1} rowSpan={2}>
                                <Flex
                                  h={"100%"}
                                  alignItems="center"
                                  justifyContent="center"
                                >
                                  <Image
                                    alt={selectedAccount.name}
                                    src={selectedAccount.avatar}
                                    key={selectedAccount.address}
                                    h={"36px"}
                                    w={"36px"}
                                  />
                                </Flex>
                              </GridItem>
                              <GridItem colSpan={1}>
                                <Text>{selectedAccount.name}</Text>
                              </GridItem>
                              <GridItem colSpan={1} textAlign={"left"}>
                                <Text color={"gray.400"}>
                                  {selectedAccount.address.slice(0, 4)}...
                                  {selectedAccount.address.slice(-4)}
                                </Text>
                              </GridItem>
                            </Grid>
                          ) : (
                            <Flex alignItems={"center"}>Select Accounts</Flex>
                          )}
                        </Flex>
                      </MenuButton>
                      <MenuList>
                        {enabledAccounts.map((account) => {
                          return (
                            <MenuItem
                              key={account.address}
                              onClick={() => {
                                setSelectedAccount(account);
                              }}
                            >
                              <Grid
                                templateColumns="auto 1fr"
                                columnGap={4}
                                rowGap={1}
                              >
                                <GridItem colSpan={1} rowSpan={2}>
                                  <Flex
                                    h={"100%"}
                                    alignItems="center"
                                    justifyContent="center"
                                  >
                                    <Image
                                      alt={account.name}
                                      src={account.avatar}
                                      key={account.address}
                                      h={"36px"}
                                      w={"36px"}
                                    />
                                  </Flex>
                                </GridItem>
                                <GridItem colSpan={1}>
                                  <Text>{account.name}</Text>
                                </GridItem>
                                <GridItem colSpan={1}>
                                  <Text color={"gray.400"}>
                                    {account.address.slice(0, 4)}...
                                    {account.address.slice(-4)}
                                  </Text>
                                </GridItem>
                              </Grid>
                            </MenuItem>
                          );
                        })}
                      </MenuList>
                    </Menu>
                  </Flex>
                  <Button
                    isDisabled={selectedAccount == null || isLoading}
                    colorScheme="pink"
                    h={"60px"}
                    onClick={async () => {
                      setIsLoading(true);
                      await getSignature(selectedAccount, callbackUrl);
                      setIsLoading(false);
                    }}
                  >
                    Sign & Login
                  </Button>
                </Flex>
              </ModalBody>
            </>
          ) : (
            <>
              <ModalHeader textAlign={"center"}>
                <Flex flexDir={"column"}>
                  <Text fontSize={"2xl"} as={"b"}>
                    Login to dotappstore
                  </Text>
                  <Text fontSize={"md"}>Please select your web3 wallet</Text>
                </Flex>
              </ModalHeader>
              <ModalBody>
                <Flex flexDir={"column"} gap={"50px"} paddingBottom={"50px"}>
                  <Flex flexDir={"column"} gap={"10px"}>
                    {supportedWallets.map((wallet) => {
                      return (
                        <Button
                          isDisabled={!wallet.installed}
                          onClick={() => {
                            setSelected(wallet.title);
                          }}
                          variant={wallet.installed ? "outline" : "solid"}
                          key={wallet.title}
                          h={"60px"}
                          borderColor={
                            selected == wallet.title ? "#d53f8c" : "gray.300"
                          }
                        >
                          <Flex
                            justifyContent={"space-between"}
                            alignItems={"center"}
                            gap={"10px"}
                            w={"100%"}
                          >
                            <Flex alignItems={"center"} gap={"10px"}>
                              <Image
                                alt={wallet.title}
                                h={"40px"}
                                w={"40px"}
                                src={wallet.logo.src}
                              />
                              {wallet.title}
                            </Flex>
                            {wallet.installed ? null : (
                              <Text>Not installed</Text>
                            )}
                          </Flex>
                        </Button>
                      );
                    })}
                  </Flex>
                  <Flex gap={"15px"}>
                    <Checkbox
                      isChecked={checked}
                      colorScheme="pink"
                      onChange={handleCheckboxChange}
                      size={"lg"}
                    />
                    <Text>
                      I understand that I can only use an account with a
                      <Link
                        href="https://wiki.polkadot.network/docs/learn-identity"
                        style={{ color: "#d0307a" }}
                      >
                        <b> verified identity </b>
                      </Link>
                      to login
                    </Text>
                  </Flex>
                  <Button
                    isDisabled={!checked}
                    colorScheme="pink"
                    onClick={async () => {
                      const selectedWallet = supportedWallets.find(
                        (wallet) => wallet.title === selected
                      );
                      if (selectedWallet) {
                        console.log(selectedWallet);
                        await selectedWallet.enable("dotappstore").then(() => {
                          selectedWallet.subscribeAccounts((accounts) => {
                            setEnabledAccounts(
                              accounts.filter((account) => {
                                return account.address.slice(0, 2) != "0x";
                              })
                            );
                            console.log(accounts);
                          });
                        });
                      }
                    }}
                  >
                    Login with web3 address
                  </Button>
                </Flex>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
